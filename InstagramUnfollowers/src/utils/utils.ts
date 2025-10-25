import { UserNode } from "../model/user";
import { UNFOLLOWERS_PER_PAGE, WITHOUT_PROFILE_PICTURE_URL_IDS } from "../constants/constants";
import { ScanningTab } from "../model/scanning-tab";
import { ScanningFilter } from "../model/scanning-filter";
import { UnfollowLogEntry } from "../model/unfollow-log-entry";
import { UnfollowFilter } from "../model/unfollow-filter";

export async function copyListToClipboard(nonFollowersList: readonly UserNode[]): Promise<void> {
  const sortedList = [...nonFollowersList].sort((a, b) => (a.username > b.username ? 1 : -1));

  let output = '';
  sortedList.forEach(user => {
    output += user.username + '\n';
  });

  await navigator.clipboard.writeText(output);
  alert('List copied to clipboard!');
}

export function getMaxPage(nonFollowersList: readonly UserNode[]): number {
  const pageCalc = Math.ceil(nonFollowersList.length / UNFOLLOWERS_PER_PAGE);
  return pageCalc < 1 ? 1 : pageCalc;
}

export function getCurrentPageUnfollowers(nonFollowersList: readonly UserNode[], currentPage: number): readonly UserNode[] {
  const sortedList = [...nonFollowersList].sort((a, b) => (a.username > b.username ? 1 : -1));
  return sortedList.splice(UNFOLLOWERS_PER_PAGE * (currentPage - 1), UNFOLLOWERS_PER_PAGE);
}

export function getUsersForDisplay(
  results: readonly UserNode[],
  whitelistedResults: readonly UserNode[],
  currentTab: ScanningTab,
  searchTerm: string,
  filter: ScanningFilter,
): readonly UserNode[] {
  const users: UserNode[] = [];
  for (const result of results) {
    const isWhitelisted = whitelistedResults.find(user => user.id === result.id) !== undefined;
    switch (currentTab) {
      case "non_whitelisted":
        if (isWhitelisted) {
          continue;
        }
        break;
      case "whitelisted":
        if (!isWhitelisted) {
          continue;
        }
        break;
      default:
        assertUnreachable(currentTab);
    }
    if (!filter.showPrivate && result.is_private) {
      continue;
    }
    if (!filter.showVerified && result.is_verified) {
      continue;
    }
    if (!filter.showFollowers && result.follows_viewer) {
      continue;
    }
    if (!filter.showNonFollowers && !result.follows_viewer) {
      continue;
    }
    if (!filter.showWithOutProfilePicture && WITHOUT_PROFILE_PICTURE_URL_IDS.some(id => result.profile_pic_url.includes(id))) {
      continue;
    }
    
    // Advanced filters - Account Type
    if (filter.accountTypes) {
      const accountType = result.account_type || 'personal'; // Default to personal if not available
      if (!filter.accountTypes.business && accountType === 'business') {
        continue;
      }
      if (!filter.accountTypes.personal && accountType === 'personal') {
        continue;
      }
      if (!filter.accountTypes.creator && accountType === 'creator') {
        continue;
      }
    }
    
    // Advanced filters - Last Post Activity
    if (filter.lastPostActivity?.enabled) {
      // If no timestamp, skip this user
      if (!result.last_post_timestamp) {
        continue;
      }
      const daysSinceLastPost = (Date.now() - result.last_post_timestamp) / (1000 * 60 * 60 * 24);
      if (daysSinceLastPost > filter.lastPostActivity.days) {
        continue;
      }
    }
    
    // Advanced filters - Inactive Accounts
    if (!filter.showInactive && result.is_inactive) {
      continue;
    }
    
    const userMatchesSearchTerm =
      result.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.full_name.toLowerCase().includes(searchTerm.toLowerCase());
    if (searchTerm !== "" && !userMatchesSearchTerm) {
      continue;
    }
    users.push(result);
  }
  return users;
}

export function getUnfollowLogForDisplay(log: readonly UnfollowLogEntry[], searchTerm: string, filter: UnfollowFilter) {
  const entries: UnfollowLogEntry[] = [];
  for (const entry of log) {
    if (!filter.showSucceeded && entry.unfollowedSuccessfully) {
      continue;
    }
    if (!filter.showFailed && !entry.unfollowedSuccessfully) {
      continue;
    }
    const userMatchesSearchTerm = entry.user.username.toLowerCase().includes(searchTerm.toLowerCase());
    if (searchTerm !== "" && !userMatchesSearchTerm) {
      continue;
    }
    entries.push(entry);
  }
  return entries;
}

/**
 * When writing a switch-case with a finite number of cases, use this function in the
 * `default` clause of switch-case statements for exhaustive checking. This will make
 * TS complain until ALL cases are handled. For example, if we have a switch-case
 * in-which we evaluate every possible status of a component's state, if we add this
 * to the default clause and then add a new status to the state type, TS will complain
 * and force us to handle it as well, thus avoiding forgetting it.
 */
export function assertUnreachable(_value: never): never {
  throw new Error('Statement should be unreachable');
}

export function sleep(ms: number): Promise<any> {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

export function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length !== 2) {
    return null;
  }
  return parts.pop()!.split(';').shift()!;
}

export function urlGenerator(nextCode?: string): string {
  const ds_user_id = getCookie('ds_user_id');
  if (nextCode === undefined) {
    // First url
    return `https://www.instagram.com/graphql/query/?query_hash=3dec7e2c57367ef3da3d987d89f9dbc8&variables={"id":"${ds_user_id}","include_reel":"true","fetch_mutual":"false","first":"24"}`;
  }
  return `https://www.instagram.com/graphql/query/?query_hash=3dec7e2c57367ef3da3d987d89f9dbc8&variables={"id":"${ds_user_id}","include_reel":"true","fetch_mutual":"false","first":"24","after":"${nextCode}"}`;
}

export function unfollowUserUrlGenerator(idToUnfollow: string): string {
  return `https://www.instagram.com/web/friendships/${idToUnfollow}/unfollow/`;
}

/**
 * Fetch user's last post timestamp from their profile page
 * This makes a request to Instagram's GraphQL API to get the user's media
 */
export async function fetchUserLastPostTimestamp(username: string): Promise<number | undefined> {
  try {
    // Instagram GraphQL query to get user's posts
    const query = {
      query_hash: "e769aa90f347a32423763fc490445c3f",
      variables: JSON.stringify({
        id: username,
        first: 1, // Only get the first (most recent) post
      })
    };
    
    const url = `https://www.instagram.com/graphql/query/?query_hash=${query.query_hash}&variables=${query.variables}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    // Parse the response to get the timestamp of the first post
    if (data.data?.user?.edge_owner_to_timeline_media?.edges?.length > 0) {
      const firstPost = data.data.user.edge_owner_to_timeline_media.edges[0].node;
      return firstPost.taken_at_timestamp * 1000; // Convert to milliseconds
    }
    
    return undefined;
  } catch (error) {
    console.error(`Error fetching last post for ${username}:`, error);
    return undefined;
  }
}

/**
 * Fetch account type (business/personal/creator) from user profile
 */
export async function fetchUserAccountType(username: string): Promise<'business' | 'personal' | 'creator' | undefined> {
  try {
    const response = await fetch(`https://www.instagram.com/${username}/?__a=1&__d=dis`);
    const data = await response.json();
    
    if (data.graphql?.user?.is_business_account) {
      return 'business';
    } else if (data.graphql?.user?.is_professional_account) {
      return 'creator';
    }
    
    return 'personal';
  } catch (error) {
    console.error(`Error fetching account type for ${username}:`, error);
    return undefined;
  }
}

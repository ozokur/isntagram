export interface ScanningFilter {
  readonly showNonFollowers: boolean;
  readonly showFollowers: boolean;
  readonly showVerified: boolean;
  readonly showPrivate: boolean;
  readonly showWithOutProfilePicture: boolean;
  readonly accountTypes: {
    readonly business: boolean;
    readonly personal: boolean;
    readonly creator: boolean;
  };
  readonly lastPostActivity: {
    readonly enabled: boolean;
    readonly days: number;
  };
  readonly showInactive: boolean;
}

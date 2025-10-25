import React, { ChangeEvent, useState } from "react";
import { State } from "../model/state";
import { assertUnreachable, copyListToClipboard, getUsersForDisplay } from "../utils/utils";
import { SettingMenu } from "./SettingMenu";
import { SettingIcon } from "./icons/SettingIcon";
import { Timings } from "../model/timings";
import { Logo } from "./icons/Logo";

interface ToolBarProps {
  isActiveProcess: boolean;
  state: State;
  setState: (state: State) => void;
  scanningPaused: boolean;
  toggleAllUsers: (e: ChangeEvent<HTMLInputElement>) => void;
  toggleCurrentePageUsers: (e: ChangeEvent<HTMLInputElement>) => void;
  currentTimings: Timings;
  setTimings: (timings: Timings) => void;
}

export const Toolbar = ({
  isActiveProcess,
  state,
  setState,
  scanningPaused,
  toggleAllUsers,
  toggleCurrentePageUsers,
  currentTimings,
  setTimings,
}: ToolBarProps) => {

  const [setingMenu, setSettingMenu] = useState(false);

  return (
    <header className="app-header">
      {isActiveProcess && (
        <progress
          className="progressbar"
          value={state.status !== "initial" ? state.percentage : 0}
          max="100"
        />
      )}
      <div className="app-header-content">
        <div
          className="logo"
          onClick={() => {
            if (isActiveProcess) {
              // Avoid resetting state while active process.
              return;
            }
            switch (state.status) {
              case "initial":
                if (confirm("Go back to Instagram?")) {
                  location.reload();
                }
                break;

              case "scanning":
              case "unfollowing":
                setState({
                  status: "initial",
                });
            }
          }}
        >
          <Logo />
          <div className="logo-text">
            <span>Ozan Okur</span>
            <span>Unfollowers</span>
            <span style={{fontSize: '0.5em', color: '#00FFFF', marginTop: '5px'}}>v1.1.0</span>
          </div>
        </div>
        <button
          className="copy-list"
          onClick={() => {
            switch (state.status) {
              case "scanning":
                return copyListToClipboard(
                  getUsersForDisplay(
                    state.results,
                    state.whitelistedResults,
                    state.currentTab,
                    state.searchTerm,
                    state.filter,
                  ),
                );
              case "initial":
              case "unfollowing":
                return;
              default:
                assertUnreachable(state);
            }
          }}
          disabled={state.status === "initial"}
        >
          Copy List
        </button>
        {(state.status === "scanning" || state.status === "unfollowing") && (
          <button
            className="copy-list"
            onClick={() => {
              if (typeof (window as any).downloadLogs === 'function') {
                (window as any).downloadLogs();
              } else {
                alert('Log system not initialized. Please refresh the page.');
              }
            }}
          >
            📥 Download Logs
          </button>
        )}
        {state.status === "initial" && (
          <>
            <button
              className="copy-list"
              onClick={() => {
                const features = [
                  "✨ Browser-based Instagram unfollow tool",
                  "🎨 Custom Ozan Okur branding",
                  "🖥️ Single-click startup for Mac/Windows",
                  "📊 Server status monitoring",
                  "🎯 Advanced filtering (account type, last post, inactive)",
                  "📄 CSV export functionality",
                  "📈 Analytics dashboard",
                  "🌍 Multi-language support (TR/EN)"
                ];
                alert(`Ozan Okur Unfollowers\n\nVersion: 1.1.0\n\nFeatures:\n${features.join('\n')}\n\nGitHub: https://github.com/ozokur/isntagram`);
              }}
            >
              📋 Version
            </button>
            <button
              className="copy-list"
              onClick={() => {
                const items = [
                  "✨ Added InstagramUnfollowers integration",
                  "🎨 Custom branding: Ozan Okur Unfollowers",
                  "🖥️ Mac/Windows startup scripts",
                  "📊 Server status checker",
                  "🎯 Advanced filtering (Business/Personal/Creator accounts)",
                  "⏰ Last post activity filtering (1 week, 1 month, etc.)",
                  "😴 Inactive account detection",
                  "📄 CSV export functionality",
                  "📈 Analytics dashboard",
                  "🌍 Multi-language support"
                ];
                alert(`Changelog - Version 1.1.0\n\n${items.join('\n')}\n\nSee CHANGELOG.md for full details`);
              }}
            >
              📝 Changelog
            </button>
            <button
              className="copy-list"
              onClick={() => {
                if (typeof (window as any).downloadLogs === 'function') {
                  (window as any).downloadLogs();
                } else {
                  alert('Log system not initialized. Please refresh the page.');
                }
              }}
            >
              📥 Download Logs
            </button>
          </>
        )}
        {
          state.status === "initial" && <SettingIcon onClickLogo={() => { setSettingMenu(true); }} />
        }
        <input
          type="text"
          className="search-bar"
          placeholder="Search..."
          disabled={state.status === "initial"}
          value={state.status === "initial" ? "" : state.searchTerm}
          onChange={e => {
            switch (state.status) {
              case "initial":
                return;
              case "scanning":
                return setState({
                  ...state,
                  searchTerm: e.currentTarget.value,
                });
              case "unfollowing":
                return setState({
                  ...state,
                  searchTerm: e.currentTarget.value,
                });
              default:
                assertUnreachable(state);
            }
          }}
        />
        {state.status === "scanning" && (
          <input
            title="Select all on this page"
            type="checkbox"
            // Avoid allowing to select all before scan completed to avoid confusion
            // regarding what exactly is selected while scanning in progress.
            disabled={
              // if paused, allow to select all even if scan is not completed.
              state.percentage < 100 && !scanningPaused
            }
            checked={
              state.selectedResults.length ===
              getUsersForDisplay(
                state.results,
                state.whitelistedResults,
                state.currentTab,
                state.searchTerm,
                state.filter,
              ).length
            }
            className="toggle-all-checkbox"
            onClick={toggleCurrentePageUsers}
          />
        )}
        {state.status === "scanning" && (
          <input
            title="Select all"
            type="checkbox"
            // Avoid allowing to select all before scan completed to avoid confusion
            // regarding what exactly is selected while scanning in progress.
            disabled={
              // if paused, allow to select all even if scan is not completed.
              state.percentage < 100 && !scanningPaused
            }
            checked={
              state.selectedResults.length ===
              getUsersForDisplay(
                state.results,
                state.whitelistedResults,
                state.currentTab,
                state.searchTerm,
                state.filter,
              ).length
            }
            className="toggle-all-checkbox"
            onClick={toggleAllUsers}
          />
        )}
      </div>
      {(setingMenu) &&
        <SettingMenu
          setSettingState={setSettingMenu}
          currentTimings={currentTimings}
          setTimings={setTimings}
        ></SettingMenu>
      }

    </header>
  );
};

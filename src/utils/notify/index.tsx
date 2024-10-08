import Spinner from "@/components/atoms/Spinner";
import Notification from "rc-notification";
import {
  NoticeContent,
  NotificationInstance,
} from "rc-notification/es/Notification";
import { ReactNode, useEffect } from "react";

let notification: NotificationInstance;
/**
 * useInitNotification
 * @example
 * // Initialize Instance at _app.jsx
 * function App({ Component, pageProps }: AppProps) {
 * ...
 * useInitNotification();
 * ...
 * }
 * // Import css file
 * import "rc-notification/assets/index.css";
*/
export const useInitNotification = () => {
  useEffect(() => {
    if (typeof document === "undefined")
      throw new Error("initNotification only work on browser");
    Notification.newInstance(
      {
        maxCount: 5,
        style: {
          top: 15,
          left: "50%",
          transform: "translateX(-50%)",
        },
      },
      (n) => {
        notification = n;
      },
    );
  }, []);
};

type TConfigs =
  | ({ delay?: number } & Omit<NoticeContent, "content">)
  | undefined;
type TLoadingConfigs = Omit<NoticeContent, "content" | "key" | "duration"> & {
  key: string;
};

const DELAY_FOR_REMOVE_PREVIOUS_NOTIFY = 200;

export const notify = {
  success: (
    content: ReactNode,
    {
      delay = DELAY_FOR_REMOVE_PREVIOUS_NOTIFY,
      ...nativeConfigs
    }: TConfigs = {},
  ) =>
    setTimeout(
      () =>
        notification.notice({
          duration: 2,
          closable: false,
          ...nativeConfigs,
          content: <Content content={content} icon="SuccessIcon" />,
        }),
      delay,
    ),
  error: (content: ReactNode, { delay = 0, ...nativeConfigs }: TConfigs = {}) =>
    setTimeout(
      () =>
        notification.notice({
          duration: 15,
          closable: true,
          ...nativeConfigs,
          content: <Content content={content} icon="ErrorIcon" />,
        }),
      delay,
    ),
  info: (content: ReactNode, { delay = 0, ...nativeConfigs }: TConfigs = {}) =>
    setTimeout(
      () =>
        notification.notice({
          duration: 4,
          closable: true,
          ...nativeConfigs,
          content: <Content content={content} icon="InfoIcon" />,
        }),
      delay,
    ),
  warn: (content: ReactNode, { delay = 0, ...nativeConfigs }: TConfigs = {}) =>
    setTimeout(
      () =>
        notification.notice({
          duration: 4,
          closable: true,
          ...nativeConfigs,
          content: <Content content={content} icon="WarningIcon" />,
        }),
      delay,
    ),
  /**
   * pure
   * @description Show notification without icon
   */
  pure: (
    content: ReactNode,
    {
      delay = DELAY_FOR_REMOVE_PREVIOUS_NOTIFY,
      ...nativeConfigs
    }: TConfigs = {},
  ) =>
    setTimeout(() => {
      notification.notice({
        duration: 4,
        closable: true,
        ...nativeConfigs,
        content: <Content content={content} />,
      });
    }, delay),
  /**
   * loading
   * @description Create a loading notification that can be closed later
   * @param content
   * @param key
   * @example
   * notify.loading("Notify message", { key: "a-unique-key" });
   * // Close notify by call
   * notify.remove("a-unique-key");
   */
  loading: (content: ReactNode, configs: TLoadingConfigs) =>
    notification.notice({
      duration: 0,
      closable: true,
      ...configs,
      content: <Content content={content} icon="Spinner" />,
    }),
  /**
   * destroy
   * @description Destroy all notices
   */
  destroy: () => {
    notification.destroy();
  },
  /**
   * remove
   * @description Remove notice by key
   */
  remove: (key: string) => {
    notification.removeNotice(key);
  },
};

/**
 * Content
 */
function Content({
  content,
  icon,
}: {
  content: ReactNode;
  icon?: "ErrorIcon" | "InfoIcon" | "SuccessIcon" | "WarningIcon" | "Spinner";
}) {
  let displayContent: ReactNode = content;
  if (typeof content === "string") {
    displayContent = (
      <div>
        {content.split("\n").map((item, i) => (
          <div key={i}>{item}</div>
        ))}
      </div>
    );
  }
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#000000d9",
        padding: "0 3px",
      }}
    >
      <span style={{ marginRight: 8 }}>
        {
          {
            SuccessIcon: <SuccessIcon />,
            ErrorIcon: <ErrorIcon />,
            InfoIcon: <InfoIcon />,
            WarningIcon: <WarningIcon />,
            Spinner: <Spinner />,
            default: "",
          }[icon || "default"]
        }
      </span>
      {displayContent}
    </div>
  );
}

// Icons
function ErrorIcon() {
  return (
    <svg
      viewBox="64 64 896 896"
      focusable="false"
      data-icon="close-circle"
      width="1em"
      height="1em"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        color="#ff4d4f"
        d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"
      />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg
      viewBox="64 64 896 896"
      focusable="false"
      data-icon="info-circle"
      width="1em"
      height="1em"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        color="#1890ff"
        d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"
      />
    </svg>
  );
}

export function SuccessIcon() {
  return (
    <svg
      viewBox="64 64 896 896"
      focusable="false"
      data-icon="check-circle"
      width="1em"
      height="1em"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        color="#52C444"
        d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"
      />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg
      viewBox="64 64 896 896"
      focusable="false"
      data-icon="exclamation-circle"
      width="1em"
      height="1em"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        color="#faad14"
        d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"
      />
    </svg>
  );
}

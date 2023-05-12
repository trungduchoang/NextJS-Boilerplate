// libs
import {
  useConfirm as useConfirmDialog,
  ConfirmOptions,
} from "material-ui-confirm";
// hooks
import { useTranslation } from "@/hooks/useTranslation";

/**
 * useConfirm
 * @description Show confirm dialog, base on material-ui-confirm
 * @see https://www.npmjs.com/package/material-ui-confirm
 * @returns Callback for show confirm dialog
 * @example
 * const { confirm } = useConfirm();
 * confirm({
 *  title: "",
 *  description: "",
 *  onConfirm: () => {},
 * }).then(()=>{}).catch(()=>{})
 * @param title
 * @param titleProps
 * @param description
 * @param content
 * @param contentProps
 * @param confirmationText
 * @param cancellationText
 * @param dialogProps
 * @param dialogActionsProps
 * @param confirmationButtonProps
 * @param cancellationButtonProps
 * @param allowClose
 * @param confirmationKeyword
 * @param confirmationKeywordTextFieldProps
 * @param hideCancelButton
 * @param buttonOrder
 */
export function useConfirm() {
  const { t } = useTranslation();
  const confirm = useConfirmDialog();

  return {
    confirm: ({
      confirmationText,
      cancellationText,
      ...rest
    }: ConfirmOptions) =>
      confirm({
        confirmationText: confirmationText || t("common:confirm"),
        cancellationText: cancellationText || t("common:cancel"),
        ...rest,
      }),
  };
}

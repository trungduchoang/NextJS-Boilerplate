// libs
import {
  useConfirm as useConfirmDialog,
  ConfirmOptions,
} from "material-ui-confirm";
// hooks
import { useTranslation } from "@/hooks/useTranslation";

type TConfirmProps = {
  onConfirm?: () => void;
  onCancel?: () => void;
} & ConfirmOptions;
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
 *  onConfirm: ()=>{},
 *  onCancel: ()=>{},
 * });
 * @param title
 * @param onConfirm
 * @param onCancel
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
      confirmationText = t("common:confirm"),
      cancellationText = t("common:cancel"),
      onConfirm = () => {},
      onCancel = () => {},
      ...rest
    }: TConfirmProps) =>
      confirm({
        confirmationText,
        cancellationText,
        ...rest,
      })
        .then(onConfirm)
        .catch(onCancel),
  };
}

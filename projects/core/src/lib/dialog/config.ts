import { InjectionToken } from "@angular/core";
import { IMdlDialogConfiguration } from "./mdl-dialog-configuration";

export const MDL_CONFIGUARTION = new InjectionToken<IMdlDialogConfiguration>(
  "MDL_CONFIGUARTION"
);
export const MIN_DIALOG_Z_INDEX = 100000;

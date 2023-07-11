import { ControlBase } from "./control-base";
import { EnumFormBaseContolType } from "./form.service";

export class Mcc extends ControlBase<string> {
  override controlType = EnumFormBaseContolType.Mcc;
}
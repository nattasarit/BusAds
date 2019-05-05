import { BusMainFrameModel } from "./bus-mainframe.model";

export class BusTemplateModel {
    id: number;
    name: string;
    MainFrame: BusMainFrameModel;
    AFrameCommand: string[];
    BFrameCommand: string[];
    CFrameCommand: string[];
    TextAFrameCommand: string[];
    TextBFrameCommand: string[];
    TextCFrameCommand: string[];
}

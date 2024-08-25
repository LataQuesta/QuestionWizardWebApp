export class Question {
}
export class CorporateQuestionBM {

    CurrentUserId: number;
    TestId: number;
    CurrentSetId: number;
    CompanyId:number;
    ModuleId : number;
    IsDesktop :boolean;
    
    IsMainType: boolean;
    IsMistyping: boolean;
    IsCentresofExpression: boolean;
    IsStressAndResilence: boolean;
    IsEnneagramInstincts: boolean;
    IsPersonalitytoPresence: boolean;
    IsProfessionalCompetencies: boolean;

    CurrentSetName: string;

    NextSetId?: number;
    NextSetName: string;

    NextTypeName: string;
    NextTypeId?: number;

    CurrentSetStatus: string;
    IsScordBoardDisplay: boolean;
    IsQuestionDisplay: boolean;
    TotalQuestion: number;
    CompletedQuestion: number;
    IsShowPrevButton:boolean;
    IsShowNextButton: boolean;
    IsShowSubmitButton: boolean;
    IsShowGoToNextSetButton: boolean;
    LastQuestionId: number;
    NextQuestion: number;
    PrevQuestion: number;
    CurrentQuestionId ? : number;
    lstQuestionModel: CorporateQuestion[];
    ScoreBoard: CorporateTypeModel[];
    IsTestComplete: boolean;
    IsAssessmentError:boolean;
    lstSubType: QuestionSubType[];
    ScoreCardForSet6: ClsSet6ScoreModel[];
    SubModuleId?: number;
    lstQuestionIdStatus : QuestionIdStatus[];
    IsDisplayInstruction : boolean;
    InstructionText : string;
    CompentencyScoreCard : CompentencyScoreCard;
}
export  class CompentencyScoreCard{
    ScoreBoard : CorporateTypeModel[];
    MultiBarScoreCard : string[]
}
export class CorporateQuestion {
    TestQuestionId: number;
    QuestionId: number;
    Question: string;
    QuesId: string;
    TypeId?: number;
    ResponseTypeId?: number;
    ResponseValue?: number;
    lstQuestionRes: CorporateQuestionResponse[];
    ImpactScore?: number;
    TestId?: number;
    Rating: number;
}

export class CorporateQuestionResponse {
    ResponseId: number;
    ResponseText: string;
    Weight: number;
    SubTypeId: number;
    SubTypeName: string;
    ResponseNumber: number;
    Checked ?: boolean;
    Disable :boolean;
}

export class CorporateTypeModel {
    TypeId: number;
    TypeName: string;
    Score: number;
    ColorCode: string;
}

export enum ResponseType {
    RadioButton,
    CheckBox
}

export class CorporateQuestionSetStatusCode {
    SetId: number
    SetName: string;
    PartialSetName: string;
    StatusCode: string;
    CompletePercentage: string;
}
export class QuestionIdStatus {
         QuestionId : number;
          Status : string;
}

export enum PageLoad {
    Question = "Question",
    Scoreboard = "Scoreboard",
    FinalQuestion = "FinalQuestion",
    FinalScoreboard = "FinalScoreboard"
}

export class QuestionSubType {
    SubTypeId: number;
    SubTypeName: string;
    TypeId: number
}

export class ClsSet6ScoreModel {
    SubModuleId: number
    SubModuleName: string
    PersonalityScore: number
    PresenceScore: number
}
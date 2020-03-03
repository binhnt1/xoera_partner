import { UserEntity } from "../entities/user.entity";
import { TicketDetailEntity } from "../entities/ticket.detail.entity";
import { AccountEntity } from "../../../../mvc/domains/entities/account.entity";

export class TicketDetailDto extends TicketDetailEntity {
    public QuestionBy?: UserEntity;
    public AnswerBy?: AccountEntity;
    public AssignTo?: AccountEntity;
    public QuoteQuestionBy?: UserEntity;
    public QuoteAnswerBy?: AccountEntity;
}
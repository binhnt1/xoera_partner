import { FunctionEntity } from "../entities/function.entity";

export class FunctionDto extends FunctionEntity {
    public Functions: FunctionDto[];
    public Expand: boolean;
}
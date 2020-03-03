import { MenuPageEntity } from "../entities/menu.page.entity";

export class MenuPageDto extends MenuPageEntity {
    public Childrens: MenuPageDto[];
}
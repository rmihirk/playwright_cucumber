import { Page } from 'playwright';
import { Logger } from "winston";

export const fixture = {
    // @ts-ignore
    page: undefined as Page,
    logger: undefined as Logger
}
import * as Yup from "yup";
import {TFunction} from "i18next";

export type TranslatableSchema = (translator: TFunction) => Yup.AnySchema

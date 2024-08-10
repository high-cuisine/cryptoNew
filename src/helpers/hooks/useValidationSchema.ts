import { setIn } from 'final-form'
import { useMemo } from 'react'
import {AnyObject, InferType, ObjectSchema, ValidationError} from 'yup'
const setInError = (errors: ValidationError, innerError: ValidationError): ValidationError =>
    <ValidationError>setIn(errors, innerError.path ?? '', innerError.message);

const emptyObj: ValidationError = Object.create(null);

export const makeValidate = (schema: ObjectSchema<AnyObject>) => {
    return async function validate(values: InferType<typeof schema>) {
        try {
            await schema.validate(values, { abortEarly: false });
        } catch (errors: unknown) {
            if (errors instanceof ValidationError) {
                return errors.inner.reduce(setInError, emptyObj);
            }
        }
    };
};

export const useValidationSchema = (schema: ObjectSchema<AnyObject>) => {
    return useMemo(() => makeValidate(schema), [schema]);
};

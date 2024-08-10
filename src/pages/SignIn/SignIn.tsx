import {FunctionComponent} from "react"
import {Form} from "react-final-form";
import {useValidationSchema} from "~helpers/hooks/useValidationSchema";
import {signInValidationSchema} from "~helpers/validationSchemes/guest/sign-in";
import {BaseInput} from "~ui-kit/base/inputs/BaseInput";
import {BaseButton} from "~ui-kit/base/buttons/BaseButton";
import {FORM_ERROR, FormApi, SubmissionErrors} from "final-form";
import {useSignInMutation} from "~features/account/api";
import {InputErrorLabel} from "~ui-kit/base/labels/InputErrorLabel";

interface Values {
    email: string,
    password: string,
}

const initialValues: Values = {
    email: "",
    password: "",
}

export const SignIn: FunctionComponent = () => {
    const validationSchema = useValidationSchema(signInValidationSchema)

    const [signIn] = useSignInMutation()

    const onSubmit = async (values: Values, form: FormApi<Values, Values>, callback?: (errors?: SubmissionErrors) => void) => {
        form.submit()
        try {
            await signIn(values).unwrap()
        }
        catch (e: any) {
            let errors = e?.data?.errors

            return {
                ...errors,
                [FORM_ERROR]: errors?.non_field_errors,
            }
        }
    }

    return (
        <div>
            <Form
                onSubmit={onSubmit}
                initialValues={initialValues}
                validate={validationSchema}
                render={({handleSubmit, errors, submitError, touched}) => (
                    <>
                        <InputErrorLabel error={submitError} touched={!!touched}/>
                        <form onSubmit={handleSubmit}>
                            <BaseInput name="email"/>
                            <BaseInput name="password"/>
                            <BaseButton type="submit">
                                Submit
                            </BaseButton>
                        </form>
                    </>
                )}
            />
        </div>
    )
}
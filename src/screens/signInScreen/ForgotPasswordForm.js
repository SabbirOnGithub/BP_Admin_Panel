import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CircularProgress, Button, TextField } from '@material-ui/core';
import useStyles from "./styles";
import { saveRecoverPassword, saveResetPassword } from '../../redux/actions/userActions';


export default function ForgotPasswordForm(props) {

    const { loadingSave, showRecoveryForm, setSuccessMessage, setErrorMessage } = props

    var classes = useStyles();
    const [userId, setUserId] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordRecoveryCode, setPasswordRecoveryCode] = useState('');
    const [storedPasswordRecoveryCode, setStoredPasswordRecoveryCode] = useState('');

    const [showPassword, setShowPassword] = useState(false);



    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        // setPasswordRecoveryCode(1)
        if (userEmail && !passwordRecoveryCode) {
            dispatch(saveRecoverPassword({ userEmail }))
                .then(res => {
                    if (res.status) {
                        res?.data?.userId && setUserId(res?.data?.userId);
                        res?.data?.userEmail && setUserEmail(res?.data?.userEmail);
                        res?.data?.passwordRecoveryCode && setStoredPasswordRecoveryCode(res?.data?.passwordRecoveryCode);
                    } else {
                        console.log('err occured')
                    }
                })
                .catch(err => {
                    setErrorMessage(err)
                })
        } else {
            // console.log("email missing")

        }
        if (userEmail && passwordRecoveryCode) {
            passwordRecoveryCode === storedPasswordRecoveryCode ? setShowPassword(true) : console.log('Recovery code are not matched')
        }
        if (userEmail && passwordRecoveryCode && password && confirmPassword) {
            if (password === confirmPassword) {
                dispatch(saveResetPassword({ userId, userEmail, passwordRecoveryCode, password, confirmPassword }))
                    .then(res => {
                        if (res?.status) {
                            showRecoveryForm();
                            setErrorMessage("")
                            setSuccessMessage(res?.message);
                        } else {
                            console.log('some error occur')
                        }
                    })
                    .catch(err => {
                        setErrorMessage(err)
                    })
            }
            else {
                setSuccessMessage('');
                setErrorMessage("password not matched")
            }
        }


    }

    return (
        <form onSubmit={submitHandler}>
            {
                !userId &&
                <TextField
                    id="userEmail"
                    InputProps={{
                        classes: {
                            underline: classes.textFieldUnderline,
                            input: classes.textField,
                        },
                    }}
                    value={userEmail}
                    onChange={e => setUserEmail(e.target.value)}
                    margin="normal"
                    placeholder="Email Adress"
                    // type="email"
                    fullWidth
                />

            }

            {
                userId && !showPassword &&
                <TextField
                    id="passwordRecoveryCode"
                    InputProps={{
                        classes: {
                            underline: classes.textFieldUnderline,
                            input: classes.textField,
                        },
                    }}
                    value={passwordRecoveryCode}
                    onChange={e => setPasswordRecoveryCode(e.target.value)}
                    margin="normal"
                    placeholder="Password Recovery Code"
                    // type="email"
                    fullWidth
                />
            }
            {
                showPassword &&

                <>
                    <TextField
                        id="password"
                        InputProps={{
                            classes: {
                                underline: classes.textFieldUnderline,
                                input: classes.textField,
                            },
                        }}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        margin="normal"
                        placeholder="Password"
                        type="password"
                        fullWidth
                    />
                    <TextField
                        id="confirmPassword"
                        InputProps={{
                            classes: {
                                underline: classes.textFieldUnderline,
                                input: classes.textField,
                            },
                        }}
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        margin="normal"
                        placeholder="Confirm Password"
                        type="password"
                        fullWidth
                    />
                </>
            }


            <div className={classes.formButtons}>
                {loadingSave ? (
                    <CircularProgress size={26} className={classes.loginLoader} />
                ) : (
                    <Button
                        // disabled={
                        //     userEmail.length === 0 || password.length === 0
                        // }

                        variant="contained"
                        color="primary"
                        size="large"
                        type="submit"
                    >
                        Recover Password
                    </Button>
                )}
                <Button
                    color="secondary"
                    size="large"
                    className={classes.forgetButton}
                    onClick={showRecoveryForm}
                >
                    Sign In
                </Button>
            </div>

        </form>
    )
}

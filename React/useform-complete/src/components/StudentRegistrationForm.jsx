import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import StudentSummary from './StudentSummary';

function StudentRegistrationForm() {
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isValid }
    } = useForm({
        mode: "onChange"
    })


    const validateAge = (value) => {
        const today = new Date();
        const birthDate = new Date(value)

        const age = today.getFullYear() - birthDate.getFullYear()

        return (age >= 18 && age <= 60) || "Age must be between 18 and 60"
        // return age
    }

    // const birthDate = watch('birthDate')
    const password = watch('password');
    // const confirmPassword = watch('confirmPassword')
    const hostelRequired = watch('hostelRequired');

    const validatePassword = (value) => {
        return value === password || "Passwords do not match";
    }

    const [submittedData, setSubmittedData] = useState(null);


    function handleForm(data) {
        setSubmittedData(data)
        reset()
    }

    return (
        <div>
            <h1>Student Registration Form</h1>
            <form className='form' onSubmit={handleSubmit(handleForm)}>

                <label htmlFor="fullName">Full Name</label>
                <input type="text"
                    id='fullName'
                    {...register("fullName", {
                        required: "Full name is required",
                        validate: (value) => (
                            value.trim() !== '' || 'Full name is required'
                        )
                    })}
                />
                {errors.fullName && <p style={{ color: "red" }} role='alert'>{errors.fullName.message}</p>}<br />

                <label htmlFor="email">Email</label>
                <input type="email"
                    id='email'
                    {...register("email", {
                        required: "Email is required", pattern: {
                            value: /^\S+@\S+\.\S+$/i,
                            message: "Invalid email"
                        }
                    })}
                />
                {errors.email && <p style={{ color: "red" }} role='alert'>{errors.email.message}</p>}<br />

                <label htmlFor="birthDate">Date of Birth</label>
                <input type="date"
                    id='birthDate'
                    {...register("birthDate", {
                        required: "Birth Date is required",
                        validate: validateAge,
                    })}
                />
                {errors.birthDate && <p style={{ color: "red" }} role='alert'>{errors.birthDate.message}</p>}<br />

                <label htmlFor="phoneNumber">Phone Number</label>
                <input type='tel'
                    id='phoneNumber'
                    {...register("phoneNumber", {
                        required: "Phone Number is required",
                        pattern: {
                            value: /^\d{10}$/,
                            message: "Phone number must be 10 digits"
                        }
                    })}
                />
                {errors.phoneNumber && <p style={{ color: "red" }} role='alert'>{errors.phoneNumber.message}</p>}<br />

                <label htmlFor="gender">Gender</label>
                <select
                    id='gender'
                    {...register("gender", { required: "Gender is required" })}
                >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                {errors.gender && <p style={{ color: "red" }} role='alert'>{errors.gender.message}</p>}<br />

                <label htmlFor="course">Course</label>
                <select
                    id='course'
                    {...register("course", { required: "Course is required" })}
                >
                    <option value="">Select Course</option>
                    <option value="BSc">BSc</option>
                    <option value="Bcom">Bcom</option>
                    <option value="Btech">Btech</option>
                    <option value="BE">BE</option>
                </select>
                {errors.course && <p style={{ color: "red" }} role='alert'>{errors.course.message}</p>}<br />

                <label htmlFor="password">Password</label>
                <input type="password"
                    id='password'
                    {...register("password", {
                        required: "Password is required",
                        minLength: { value: 6, message: "Minimum 6 characters" }
                    })}
                />
                {errors.password && <p style={{ color: "red" }} role='alert'>{errors.password.message}</p>}<br />

                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password"
                    id='confirmPassword'
                    {...register("confirmPassword", {
                        required: "Password is required",
                        validate: validatePassword

                    })}
                />
                {errors.confirmPassword && <p style={{ color: "red" }} role='alert'>{errors.confirmPassword.message}</p>}<br />

                <label htmlFor="hostelRequired">Hostel Required</label>
                <select
                    id='hostelRequired'
                    {...register("hostelRequired", { required: "This field is required" })}
                >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
                {errors.hostelRequired && <p style={{ color: "red" }} role='alert'>{errors.hostelRequired.message}</p>}<br />
                {
                    hostelRequired === 'Yes' && (
                        <div>
                            <label htmlFor="hostelDetails">Hostel Details</label>
                            <input type="text"
                                id='hostelDetails'
                                {...register("hostelDetails", {
                                    required: "Hostel details are required if choosen yes"

                                })}
                            />
                            {errors.hostelDetails && <p style={{ color: "red" }} role='alert'>{errors.hostelDetails.message}</p>}<br />
                        </div>
                    )
                }

                <button type='submit' disabled={!isValid}>Submit</button>

                <div>
                    <StudentSummary studentDetails={submittedData}/>
                </div>
            </form>
        </div>
    )
}

export default StudentRegistrationForm
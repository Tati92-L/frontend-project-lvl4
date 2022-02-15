import React from 'react';
import { object, string } from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

let userSchema = object().shape({
    name: string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
    password: string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

export default function Login() {
return(
<div className='col-12 col-md-6 mt-3 mt-mb-0'>
 <h1 className='text-center mb-4'>Login</h1>
    <Formik
    initialValues={{ name: '', password: '' }}
    validationSchema={userSchema}
    onSubmit={values => {
        console.log(values);
      }}
>
       {({ errors, touched }) => (
         <Form>
           <Field name="name" placeholder="Your name" className='form-control' autoComplete="username"/>
           {errors.name && touched.name ? (
             <div>{errors.name}</div>
           ) : null}
           <Field name="password" placeholder="Password" className='form-control' autoComplete="current-password"/>
           {errors.password && touched.password ? (
             <div>{errors.password}</div>
           ) : null}
           <button type="submit" className='w-100 mb-3 btn btn-outline-primary'>Submit</button>
         </Form>
       )}
     </Formik>
   </div>
)   

};
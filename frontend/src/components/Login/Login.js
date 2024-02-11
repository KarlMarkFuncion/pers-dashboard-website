import LoginForm from "./LoginForm"; 

 
  export default function Login() {
    return (
       <>
        <div className="p-5 mx-auto grid container h-12 w-fit gap-5 items-center"> 

            {/* Have the signup form just be a "Form component" with customizable list of inputs and input types from a Json file.
                i.e. : 
                {
                    "first_name" : {
                        "type" :screen string
                    },
                    "password" : {
                        "type" : password,
                        "min" : 8
                    }
                }

                and so on. Have the name be the field needed in the MongoDB schema. Add form validation and basic salting later
            */}
            <LoginForm />
        </div>
       </>
    );
  }
import { Button, Typography } from "@material-tailwind/react";
import React from "react";

const LandingPage = () => {
   return (
       <div className='w-full lg:p-8 px-4 py-5 flex container  mx-auto'>
           <div className='lg:w-[60%] w-full lg:px-6 lg:pr-14'>
               <Typography className='text-3xl '>
                   Welcome to Our Landing Page!
               </Typography>
               <Typography className='font-poppins mb-6'>
                   Some text here.
               </Typography>
               <Button size='lg' color='black'>
                   Get Connected
               </Button>
           </div>
           <div className='lg:w-[40%] w-full lg:block hidden '>
               <img src={"https://picsum.photos/200"} alt='LandingPage' />
           </div>
       </div>
   );
};

export default LandingPage;

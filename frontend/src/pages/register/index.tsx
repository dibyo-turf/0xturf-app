import Layout from "../../components/sections/registration/RegistrationLayout";
import React, { useState, createContext, useEffect, useLayoutEffect } from "react";
import Identity from "../../components/sections/registration/Identity";
import ChooseTurf from "../../components/sections/registration/ChooseTurf";
import SignupLoader from "../../components/loaders/SignupLoader";
import { BackButton, Card } from "../signin";
import { motion, AnimatePresence } from "framer-motion";
import ChooseAvatar from "@/components/sections/registration/ChooseAvatar";
import { useAppSelector } from "@/redux/hooks";
import { useLocation, useNavigate } from "react-router-dom";
const RegisterationSteps = [
  {
    id: 0,
    title: "Create Identity",
    subtitle: "Create your own unique identity that will help recognize and share your portfolio over the your network, we call it Turf-ID.",
    component: <Identity />,
  },
  {
    id: 1,
    title: "Select games",
    subtitle: "Select your Favorite games from the list of all games",
    component: <ChooseTurf />,
  },
  {
    id: 2,
    title: "Choose your avatar",
    subtitle: "Select the face you want",
    component: <ChooseAvatar />,
  },
];
export const RegistrationStepsContext = createContext<{
  showLoader: boolean;
  registrationData: {
    turfId: string;
    games: { id: string, name: string }[];
  };
  currentStep: number;
  setShowLoader: React.Dispatch<React.SetStateAction<boolean>>;
  setRegistrationData: React.Dispatch<
    React.SetStateAction<{
      turfId: string;
      games: { id: string, name: string }[]
    }>
  >;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}>({
  currentStep: 0,
  showLoader: false,
  registrationData: {
    turfId: "",
    games: []
  },
  setShowLoader: () => {
    return null;
  },
  setRegistrationData: () => {
    return null;
  },
  setCurrentStep: () => {
    return null;
  },
});
const Register = () => {
  const [registrationData, setRegistrationData] = useState<{
    turfId: string;
    games: { id: string, name: string }[]
  }>({
    turfId: "",
    games: []
  });
  const { status } = useAppSelector(state => state.auth)
  const [showLoader, setShowLoader] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const location = useLocation()
  const navigate = useNavigate()
  // useLayoutEffect(() => {
  //   if (status === "registered") {
  //     navigate(-1)
  //   }
  // }, [location.pathname])

  if (showLoader) return <SignupLoader />;

  return (
    <RegistrationStepsContext.Provider
      value={{
        showLoader,
        registrationData,
        setRegistrationData,
        setShowLoader,
        currentStep,
        setCurrentStep,
      }}
    >
      <Layout>
        {currentStep !== 0 && (
          <BackButton
            onClick={() => {
              setCurrentStep(currentStep - 1);
            }}
          />
        )}
        <AnimatePresence>
          <Card
            title={RegisterationSteps[0].title}
            subtitle={RegisterationSteps[0].subtitle}
            showTerms
            initial={{
              y: 0,
            }}
            transition={{
              duration: 0.5,
            }}
            animate={{
              y: currentStep === 1 || currentStep === 2 ? -1000 : 0,
            }}
            className="absolute top-0 z-40 w-full h-full"
          >
            {RegisterationSteps[0].component}
          </Card>
        </AnimatePresence>

        <Card
          title={RegisterationSteps[1].title}
          subtitle={RegisterationSteps[1].subtitle}
          initial={{
            top: 10,
            width: "90%",
          }}
          transition={{
            duration: 0.5,
          }}
          animate={{
            y: currentStep === 2 ? -1000 : 0,
            top: currentStep === 1 ? 0 : 10,
            width: currentStep === 1 ? "100%" : "90%",
          }}
          className="absolute z-30 w-[90%]"
        >
          {currentStep === 1 && RegisterationSteps[1].component}
        </Card>
        <Card
          initial={{
            top: 20,
            width: "80%",
          }}
          title={RegisterationSteps[2].title}
          subtitle={RegisterationSteps[2].subtitle}
          transition={{
            duration: 0.5,
          }}
          animate={{
            top: currentStep === 1 ? 12 : currentStep === 2 ? 0 : 20,
            width:
              currentStep === 1 ? "90%" : currentStep === 2 ? "100%" : "80%",
          }}
          className="absolute   z-20 w-[80%]"
        >
          {currentStep === 2 && RegisterationSteps[2].component}
        </Card>
        <div className="h-[100px] w-[30px]  card_bg right-[-40px] flex flex-col justify-center items-center absolute bottom-0 rounded-[190px]">
          <div className="w-[2px] bg-[#2B2B2B] relative h-[80%]">
            <motion.div
              initial={{
                height: "0%",
              }}
              transition={{
                duration: 0.5,
              }}
              animate={{
                height:
                  currentStep === 1 ? "50%" : currentStep === 2 ? "100%" : "0%",
              }}
              className="bg-[#7C40E4] h-[50%] w-full absolute top-0"
            ></motion.div>
          </div>
          <div className="absolute h-[80%] mx-auto flex flex-col justify-between">
            {[1, 2, 3].map((value, index) => (
              <motion.div
                key={index}
                initial={{
                  backgroundColor: "#2B2B2B",
                }}
                animate={{
                  backgroundColor:
                    value <= currentStep + 1 ? "#7C40E4" : "#2B2B2B",
                }}
                className="w-[14px] h-[14px]   rounded-full"
              />
            ))}
          </div>
        </div>
      </Layout>
    </RegistrationStepsContext.Provider>
  );
};

export default Register;

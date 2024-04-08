// import MalNutritionForm from '@/components/MalNutritionForm/MalNutritionForm';

import MalNutritionForm from "@/components/Malnutrition/MalNutritionForm";

const MalNutrition = () => {
  return (
    <>
      <div className="container mx-auto mt-12 px-4 h-screen flex flex-col justify-center items-center">
        <h1 className="text-3xl font-semibold mb-4">
          Check if You are Malnourished or Not!!
        </h1>
        <div className="flex justify-center items-center space-x-6">
          <MalNutritionForm />
        </div>
      </div>
    </>
  );
};

export default MalNutrition;

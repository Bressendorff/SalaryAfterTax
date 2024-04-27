import { useRef, useState } from "react";
import { Center, Grid, GridItem, HStack, Input, Text } from "@chakra-ui/react";

interface SalaryQuery {
  salary: number;
}

function App() {
  const [salaryQuery, setSalaryQuery] = useState<SalaryQuery>();

  const ref = useRef<HTMLInputElement>(null);

  const salaryInputChangedHandler = (salary: string | undefined) => {
    if (!salary) return;

    const salaryBeforeTax = parseInt(salary);
    const salaryAfterTax = calculateSalaryAfterTax(salaryBeforeTax);
    setSalaryQuery({ ...salaryQuery, salary: salaryAfterTax });
  };

  const calculateSalaryAfterTax = (salary: number): number => {
    //Tax rates
    const AMcontributionPercentage = 8;
    const roskildeTax = 37.21;
    const ATPcontributionDKK = 99;

    //Tax deductions
    const personalDeduction = 49700 / 12;
    const employmentDeduction = salary * 0.1065;

    const deductions = personalDeduction + employmentDeduction;

    if (salary > 10000) {
      salary -= ATPcontributionDKK;
    }

    salary *= (100 - AMcontributionPercentage) / 100;
    salary -= deductions;

    if (salary > 0) {
      salary *= (100 - roskildeTax) / 100;
    }

    salary += deductions;

    return Math.round(salary);
  };

  return (
    <>
      <Center>
        <Text fontSize={"5xl"}>Salary Calculator</Text>
      </Center>
      <Center>
        <Grid
          templateAreas={`"header header"
        "main main"`}
          gridTemplateRows={"50px 1fr 30px"}
          gridTemplateColumns={"150px 1fr"}
          h="200px"
          gap="1"
          color="blackAlpha.700"
          fontWeight="bold"
        >
          <GridItem pl="2" area={"header"}>
            <Input
              ref={ref}
              borderRadius={20}
              placeholder="Enter salary"
              variant="filled"
              onInput={() => salaryInputChangedHandler(ref.current?.value)}
              type="number"
            />
          </GridItem>
          <GridItem pl="2" area={"main"}>
            <HStack>
              <Text textColor={"white"}>Salary after tax</Text>

              <Text
                textColor={"white"}
                borderColor={"black"}
                borderWidth={"2px"}
                padding={1}
              >
                {salaryQuery?.salary ? salaryQuery?.salary + " DKK" : ""}
              </Text>
            </HStack>
          </GridItem>
        </Grid>
      </Center>
    </>
  );
}

export default App;

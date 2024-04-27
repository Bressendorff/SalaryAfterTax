import { createMemo, createSignal, type Component } from 'solid-js';
import { Input, InputAdornment, TextField } from '@suid/material';

const App: Component = () => {
  const [salary, setSalary] = createSignal<number>(0);
  const salaryInput = createMemo<HTMLInputElement | null>(() => null);

  const handleSalaryChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const salaryBeforeTax = parseFloat(target.value)
    const salaryAfterTax = salaryBeforeTax * 0.92 * 0.6299;
    setSalary(salaryAfterTax);
  };

  return (
  <div style="padding:1em">
    <div class="grid w-full max-w-sm items-center gap-1.5">
      <Input type="number" id="salary" placeholder="Monthly Salary (DKK)" ref={salaryInput} oninput={(e) => handleSalaryChange(e)} />
    </div>

    <br/>


    <div class="grid w-full max-w-sm items-center gap-1.5">
    <TextField
        id="outlined-basic"
        label="After tax"
        variant="outlined"
        disabled={true}
        value={salary()}
        InputProps={{
          endAdornment: <InputAdornment position='start'>DKK</InputAdornment>,
        }}
        
      ></TextField>
    </div>
  </div>)
};

export default App;

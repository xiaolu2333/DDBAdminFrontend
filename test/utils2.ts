function calculatePercentage(total: string, used: string): { total: string; used: string; rate: string } {
  // Check if the input parameters are valid numbers
  if (isNaN(Number(total)) || isNaN(Number(used))) {
    throw new Error('Invalid input: total and used must be numbers.');
  }

  // Calculate the percentage
  const rate = ((Number(used) / Number(total)) * 100).toFixed(3);

  // Return the result as an object
  return {
    total,
    used,
    rate,
  };
}

// Test the function
console.log(calculatePercentage('100', '50'));
const http = require('http');

// Test function to make HTTP requests
function makeRequest(options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({ statusCode: res.statusCode, data: jsonData });
        } catch (e) {
          resolve({ statusCode: res.statusCode, data: data });
        }
      });
    });

    req.on('error', reject);
    
    if (postData) {
      req.write(postData);
    }
    
    req.end();
  });
}

async function testAPI() {
  const baseUrl = 'localhost';
  const port = 5000;
  
  console.log('🧪 Testing Expense Tracker API...\n');

  try {
    // Test 1: Health Check
    console.log('1. Testing Health Check...');
    const healthCheck = await makeRequest({
      hostname: baseUrl,
      port: port,
      path: '/api/health',
      method: 'GET'
    });
    console.log(`✅ Status: ${healthCheck.statusCode}`);
    console.log(`📋 Response:`, healthCheck.data);
    console.log('');

    // Test 2: Get All Expenses (should be empty initially)
    console.log('2. Testing Get All Expenses...');
    const getAllExpenses = await makeRequest({
      hostname: baseUrl,
      port: port,
      path: '/api/expenses',
      method: 'GET'
    });
    console.log(`✅ Status: ${getAllExpenses.statusCode}`);
    console.log(`📋 Response:`, getAllExpenses.data);
    console.log('');

    // Test 3: Create New Expense
    console.log('3. Testing Create New Expense...');
    const newExpense = {
      description: 'Coffee at Starbucks',
      category: 'Food',
      amount: 4.95
    };
    
    const createExpense = await makeRequest({
      hostname: baseUrl,
      port: port,
      path: '/api/expenses',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(JSON.stringify(newExpense))
      }
    }, JSON.stringify(newExpense));
    
    console.log(`✅ Status: ${createExpense.statusCode}`);
    console.log(`📋 Response:`, createExpense.data);
    
    let expenseId = null;
    if (createExpense.data && createExpense.data.data && createExpense.data.data._id) {
      expenseId = createExpense.data.data._id;
      console.log(`🆔 Created Expense ID: ${expenseId}`);
    }
    console.log('');

    // Test 4: Get All Expenses Again (should have one now)
    console.log('4. Testing Get All Expenses (after creation)...');
    const getAllExpensesAfter = await makeRequest({
      hostname: baseUrl,
      port: port,
      path: '/api/expenses',
      method: 'GET'
    });
    console.log(`✅ Status: ${getAllExpensesAfter.statusCode}`);
    console.log(`📋 Response:`, getAllExpensesAfter.data);
    console.log('');

    // Test 5: Update Expense (if we have an ID)
    if (expenseId) {
      console.log('5. Testing Update Expense...');
      const updateData = {
        description: 'Updated: Coffee and pastry',
        category: 'Food',
        amount: 8.50
      };
      
      const updateExpense = await makeRequest({
        hostname: baseUrl,
        port: port,
        path: `/api/expenses/${expenseId}`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(JSON.stringify(updateData))
        }
      }, JSON.stringify(updateData));
      
      console.log(`✅ Status: ${updateExpense.statusCode}`);
      console.log(`📋 Response:`, updateExpense.data);
      console.log('');

      // Test 6: Delete Expense
      console.log('6. Testing Delete Expense...');
      const deleteExpense = await makeRequest({
        hostname: baseUrl,
        port: port,
        path: `/api/expenses/${expenseId}`,
        method: 'DELETE'
      });
      
      console.log(`✅ Status: ${deleteExpense.statusCode}`);
      console.log(`📋 Response:`, deleteExpense.data);
      console.log('');
    }

    // Test 7: Test Error Handling
    console.log('7. Testing Error Handling (Invalid Expense)...');
    const invalidExpense = {
      description: '',
      category: 'InvalidCategory',
      amount: -5
    };
    
    const createInvalidExpense = await makeRequest({
      hostname: baseUrl,
      port: port,
      path: '/api/expenses',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(JSON.stringify(invalidExpense))
      }
    }, JSON.stringify(invalidExpense));
    
    console.log(`✅ Status: ${createInvalidExpense.statusCode}`);
    console.log(`📋 Response:`, createInvalidExpense.data);
    console.log('');

    console.log('🎉 API Testing Completed!');

  } catch (error) {
    console.error('❌ Error testing API:', error.message);
  }
}

// Run the tests
testAPI();

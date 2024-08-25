# Mercurial Dynamic AMM SDK

States and instructions for interacting with mercurial dynamic AMM program.

# Program ID

Eo7WjKq67rjJQSZxS6z3YkapzY3eMj6Xy8X5EQVn5UaB

# DLMM

To interact with the DLMM (Dynamic Liquidity Market Making) pool SOL-USDC using the Mercurial Dynamic AMM SDK, you'll need to transition from making simple REST API requests to using the SDK provided by Mercurial Finance. This SDK is built for more sophisticated interaction with the pools, such as executing trades, adding/removing liquidity, and more.

Here’s how you can get started:

### 1. **Set Up Your Environment**
   - Make sure you have Python installed along with `pip`.
   - Since the Mercurial SDK is in TypeScript, you’ll need to integrate it with Python. This could be done using tools like `PyO3` for Rust-based SDKs, or more practically, you could create a Python wrapper around the TypeScript SDK or use `subprocess` to call Node.js scripts from Python if a full Python SDK isn’t available.

### 2. **Install Dependencies**
   - Install `node.js` and `npm`.
   - Clone the SDK repo and install its dependencies:

   ```bash
   git clone https://github.com/mercurial-finance/mercurial-dynamic-amm-sdk.git
   cd mercurial-dynamic-amm-sdk/ts-client
   npm install
   ```

### 3. **Create a Node.js Script for Pool Interaction**
   Write a TypeScript/JavaScript file that interacts with the SOL-USDC pool using the SDK. For instance:

   ```javascript
   const { MercurialAmm } = require('mercurial-dynamic-amm-sdk');

   async function getSolUsdcPool() {
       const sdk = new MercurialAmm();
       await sdk.init(); // Initialize the SDK

       const solUsdcPool = await sdk.getPool('SOL-USDC');
       
       console.log('SOL-USDC Pool Data:', solUsdcPool);
       return solUsdcPool;
   }

   getSolUsdcPool().catch(console.error);
   ```

### 4. **Call the Node.js Script from Python**
   Use `subprocess` in your Python script to run the Node.js script:

   ```python
   import subprocess

   def get_sol_usdc_pool():
       try:
           result = subprocess.run(['node', 'path_to_your_script.js'], stdout=subprocess.PIPE)
           return result.stdout.decode('utf-8')
       except Exception as e:
           print(f"Error interacting with the SDK: {e}")
           return None

   def main():
       pool_data = get_sol_usdc_pool()
       if pool_data:
           print("SOL-USDC Pool Data:")
           print(pool_data)
       else:
           print("Failed to fetch SOL-USDC pool data using SDK.")

   if __name__ == "__main__":
       main()
   ```

### 5. **Extract Data and Use It in Python**
   Parse the output from your Node.js script in Python to access and manipulate the pool data.

### 6. **Advanced Interaction (Optional)**
   - You can expand this setup to allow for more complex interactions like adding/removing liquidity, swapping tokens, etc., as per your requirements.

### 7. **Deploy and Test**
   - Deploy your solution on a development or staging environment, and thoroughly test to ensure that it behaves as expected with the Mercurial Dynamic AMM.

### Additional Steps:
If your interaction requires more frequent updates or a more seamless integration between Python and the Mercurial SDK, consider writing a dedicated Python wrapper for the SDK using tools like `PyBind11` or exploring existing Python bindings.

This setup allows you to leverage the full power of the Mercurial Dynamic AMM SDK while maintaining your existing Python-based application.
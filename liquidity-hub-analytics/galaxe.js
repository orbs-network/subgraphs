const checkAddressSwaps = async (address, tradeSize = 100) => {
    const endpoint = 'https://hub.orbs.network/api/apikey/subgraphs/id/7gdbLg1EyMjUPXWoDE1Dnu9CjSoG9n5bB3DJBGXaMVuA';

    try {
        const query = {
            query: `
        query CheckSwaps($address: String!, $minValue: BigDecimal!) {
          swaps(
            first: 1,
            where: {
              and: [
                {userAddress: $address},
                {dollarValue_gt: $minValue}
              ]
            }
          ) {
            userAddress
          }
        }
      `,
            variables: {
                address: address.toLowerCase(),
                minValue: tradeSize.toString()  // GraphQL expects string for BigDecimal
            }
        };

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(query)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // If swaps array has any entries, it means the address has qualifying swaps
        return data.data.swaps.length > 0 ? address : null;
    } catch (error) {
        console.error('Error checking address:', error);
        throw error;
    }
};

// Example usage
const address = '0x...';
checkAddressSwaps(address)
    .then(result => {
        if (result) {
            console.log(result);
        } else {
            console.log('No qualifying swaps found for this address');
        }
    })
    .catch(error => {
        console.error('Failed to check address:', error);
    });
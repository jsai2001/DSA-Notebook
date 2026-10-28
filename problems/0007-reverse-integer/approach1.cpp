#include <climits>
#include <cstdlib>
#include <string>
class Solution {
public:
    int reverse(int x) {
        // 64-bit throughout: abs(INT_MIN) and the reversed number can both
        // be too big for int before the range check at the end.
        long long rev = 0; // @viz init
        long long n = std::llabs((long long)x); // @viz sign
        bool positive = x >= 0; // @viz sign
        int decimal = std::to_string(n).size() - 1; // @viz digits
        long long place = 1; // 10^decimal
        for (int k = 0; k < decimal; ++k) place *= 10; // @viz digits
        while (decimal) { // @viz loop
            rev += (n % 10) * place; // @viz place
            decimal--; // @viz next
            place /= 10; // @viz next
            n /= 10; // @viz next
        }
        rev += n; // @viz last
        if (!positive) rev = -rev; // @viz restore
        if (rev < INT_MIN || rev > INT_MAX) // @viz check
            return 0; // @viz overflow
        return (int)rev; // @viz return
    }
};

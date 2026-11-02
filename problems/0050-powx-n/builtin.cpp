#include <cmath>
class Solution {
public:
    double myPow(double x, int n) {
        return std::pow(x, n); // n is converted to double, so -2^31 is fine
    }
};

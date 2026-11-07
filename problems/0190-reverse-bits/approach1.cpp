#include <algorithm>
#include <bitset>
#include <string>
class Solution {
public:
    int reverseBits(int n) {
        std::string bits = std::bitset<32>(n).to_string(); // exactly 32 digits, leading zeros kept // @viz text
        std::reverse(bits.begin(), bits.end()); // read the digits backwards // @viz back
        return (int)std::stoul(bits, nullptr, 2); // @viz back
    }
};

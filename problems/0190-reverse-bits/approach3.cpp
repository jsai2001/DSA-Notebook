#include <cstdint>
class Solution {
public:
    int reverseBits(int n) {
        uint32_t x = n; // unsigned: shifts never touch a sign bit // @viz s16
        x = (x >> 16) | (x << 16); // swap the two 16-bit halves // @viz s16
        x = ((x >> 8) & 0x00FF00FF) | ((x & 0x00FF00FF) << 8); // swap the bytes in each half // @viz s8
        x = ((x >> 4) & 0x0F0F0F0F) | ((x & 0x0F0F0F0F) << 4); // swap the 4-bit pieces in each byte // @viz s4
        x = ((x >> 2) & 0x33333333) | ((x & 0x33333333) << 2); // swap the pairs // @viz s2
        x = ((x >> 1) & 0x55555555) | ((x & 0x55555555) << 1); // swap neighbouring bits // @viz s1
        return (int)x; // @viz return
    }
};

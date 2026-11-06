#include <string>
class Solution {
public:
    int numDistinct(std::string s, std::string t) {
        a = s; // @viz answer
        b = t; // @viz answer
        return (int)count(0, 0); // @viz answer
    }
private:
    std::string a, b;
    // unsigned: the sums can pass the int range on the way; unsigned overflow wraps safely (signed overflow is undefined)
    unsigned count(size_t i, size_t j) { // ways to spell t[j..] using letters of s[i..], in order // @viz call
        if (j == b.size()) return 1; // all of t is spelled: one way // @viz done
        if (a.size() - i < b.size() - j) return 0; // not enough of s left // @viz short
        unsigned ways = count(i + 1, j); // skip s[i] // @viz skip
        if (a[i] == b[j]) ways += count(i + 1, j + 1); // or use s[i] for t[j] // @viz use
        return ways; // @viz sum
    }
};

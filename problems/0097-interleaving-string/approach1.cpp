#include <string>
class Solution {
public:
    bool isInterleave(std::string s1, std::string s2, std::string s3) {
        if (s1.size() + s2.size() != s3.size()) return false; // the letters have to add up // @viz len
        a = s1; // @viz answer
        b = s2; // @viz answer
        c = s3; // @viz answer
        return can(0, 0); // @viz answer
    }
private:
    std::string a, b, c;
    bool can(size_t i, size_t j) { // can s3[i+j..] be made from s1[i..] and s2[j..]? // @viz call
        if (i == a.size() && j == b.size()) return true; // everything used: done // @viz base
        size_t k = i + j; // the next letter of s3 // @viz call
        if (i < a.size() && a[i] == c[k] && can(i + 1, j)) return true; // take it from s1 // @viz take1
        if (j < b.size() && b[j] == c[k] && can(i, j + 1)) return true; // or from s2 // @viz take2
        return false; // @viz fail
    }
};

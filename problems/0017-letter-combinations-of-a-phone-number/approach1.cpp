#include <string>
#include <utility>
#include <vector>
class Solution {
public:
    std::vector<std::string> letterCombinations(std::string digits) {
        if (digits.empty()) return {}; // no digits: no combinations (not [""]) // @viz empty
        const std::vector<std::string> letters = {"", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"}; // @viz init
        std::vector<std::string> combos = {""}; // one way to spell nothing so far // @viz init
        for (char d : digits) { // @viz digit
            // every combination so far, extended by every letter of this digit
            std::vector<std::string> next; // @viz extend
            for (const std::string& c : combos) // @viz extend
                for (char ch : letters[d - '0']) next.push_back(c + ch); // @viz extend
            combos = std::move(next); // @viz extend
        }
        return combos; // @viz return
    }
};

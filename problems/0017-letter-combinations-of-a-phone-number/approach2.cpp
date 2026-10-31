#include <string>
#include <vector>
class Solution {
public:
    std::vector<std::string> letterCombinations(std::string digits) {
        if (digits.empty()) return {}; // no digits: no combinations (not [""]) // @viz empty
        result.clear(); // @viz init
        path.clear(); // @viz init
        backtrack(digits, 0); // @viz start
        return result; // @viz return
    }
private:
    const std::vector<std::string> letters = {"", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"};
    std::vector<std::string> result;
    std::string path;
    void backtrack(const std::string& digits, int i) { // pick a letter for digits[i] // @viz call
        if (i == (int)digits.size()) { // one letter picked for every digit // @viz done
            result.push_back(path); // @viz done
            return; // @viz done
        }
        for (char ch : letters[digits[i] - '0']) { // @viz choose
            path.push_back(ch); // @viz choose
            backtrack(digits, i + 1); // @viz choose
            path.pop_back(); // undo, so the next letter can take its place // @viz undo
        }
    }
};

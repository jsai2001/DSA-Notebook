#include <string>
class Solution {
public:
    bool checkValidString(std::string s) {
        this->s = s; // @viz init
        return ok(0, 0); // @viz init
    }

private:
    std::string s;

    bool ok(size_t i, int open) { // can s[i:] finish, with `open` "(" still waiting for a ")"?
        if (open < 0) return false; // a ")" with nothing to close // @viz dead
        if (i == s.size()) return open == 0; // everything closed // @viz end
        if (s[i] == '(') return ok(i + 1, open + 1); // @viz try
        if (s[i] == ')') return ok(i + 1, open - 1); // @viz try
        // "*": try all three meanings
        return ok(i + 1, open + 1) || ok(i + 1, open - 1) || ok(i + 1, open); // @viz star
    }
};

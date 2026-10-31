#include <string>
class Solution {
public:
    bool isValid(std::string s) {
        while (true) { // @viz loop
            // remove every adjacent matching pair: "()", then "[]", then "{}"
            std::string shorter = removeAll(removeAll(removeAll(s, "()"), "[]"), "{}"); // @viz remove
            if (shorter.size() == s.size()) break; // nothing left to remove // @viz check
            s = shorter; // @viz shrink
        }
        return s.empty(); // valid only if everything cancelled out // @viz return
    }
private:
    // Like Python's str.replace(pair, ""): scan left to right, drop each match.
    static std::string removeAll(const std::string& s, const std::string& pair) {
        std::string out;
        size_t from = 0, at;
        while ((at = s.find(pair, from)) != std::string::npos) {
            out.append(s, from, at - from);
            from = at + pair.size();
        }
        out.append(s, from, std::string::npos);
        return out;
    }
};

#include <string>
#include <vector>
class Solution {
public:
    bool checkValidString(std::string s) {
        std::vector<int> opens, stars; // indexes of unmatched "(" and of unused "*" // @viz init
        for (int i = 0; i < static_cast<int>(s.size()); ++i) { // @viz loop
            if (s[i] == '(') { // @viz open
                opens.push_back(i); // @viz open
            } else if (s[i] == '*') { // @viz star
                stars.push_back(i); // @viz star
            } else if (!opens.empty()) { // ")": match the nearest "(" first // @viz close
                opens.pop_back(); // @viz close
            } else if (!stars.empty()) { // no "(" left: use a "*" as "(" // @viz close
                stars.pop_back(); // @viz close
            } else { // @viz close
                return false; // @viz close
            }
        }
        // Each leftover "(" needs a "*" AFTER it to act as ")".
        while (!opens.empty() && !stars.empty()) { // @viz pair
            if (opens.back() > stars.back()) return false; // the "*" comes first: it can't close this "(" // @viz pair
            opens.pop_back(); // @viz pair
            stars.pop_back(); // @viz pair
        }
        return opens.empty(); // leftover "*" can just be empty // @viz return
    }
};

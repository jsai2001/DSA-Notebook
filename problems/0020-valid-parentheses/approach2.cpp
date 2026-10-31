#include <stack>
#include <string>
class Solution {
public:
    bool isValid(std::string s) {
        if (s.size() % 2) return false; // an odd length can't pair up // @viz odd
        std::stack<char> st; // openers still waiting for their closer // @viz init
        for (char ch : s) { // @viz loop
            if (ch == ')' || ch == ']' || ch == '}') { // a closer must match the most recent open bracket // @viz close
                char opener = ch == ')' ? '(' : ch == ']' ? '[' : '{'; // @viz close
                if (st.empty() || st.top() != opener) return false; // @viz close, mismatch
                st.pop(); // @viz match
            } else {
                st.push(ch); // an opener: wait for its closer // @viz open
            }
        }
        return st.empty(); // anything still open means invalid // @viz return
    }
};

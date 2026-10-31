#include <string>
#include <vector>
class Solution {
public:
    std::vector<std::string> generateParenthesis(int n) {
        result.clear(); // @viz init
        path.clear(); // @viz init
        backtrack(n, 0, 0); // @viz start
        return result; // @viz return
    }
private:
    std::vector<std::string> result;
    std::string path;
    void backtrack(int n, int opened, int closed) { // opened / closed: how many '(' and ')' are in path // @viz call
        if ((int)path.size() == 2 * n) { // all n pairs placed // @viz done
            result.push_back(path); // @viz done
            return; // @viz done
        }
        if (opened < n) { // an '(' is still left to place // @viz open
            path.push_back('('); // @viz open
            backtrack(n, opened + 1, closed); // @viz open
            path.pop_back(); // undo, so ')' can be tried here // @viz undo-open
        }
        if (closed < opened) { // ')' only when some '(' is still unmatched // @viz close
            path.push_back(')'); // @viz close
            backtrack(n, opened, closed + 1); // @viz close
            path.pop_back(); // @viz undo-close
        }
    }
};

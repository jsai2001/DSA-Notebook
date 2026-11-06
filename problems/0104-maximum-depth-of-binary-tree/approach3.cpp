/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
#include <algorithm>
#include <stack>
#include <utility>
class Solution {
public:
    int maxDepth(TreeNode* root) {
        int best = 0; // @viz init
        std::stack<std::pair<TreeNode*, int>> st; // (node, its depth): a stack instead of the call stack // @viz init
        if (root) st.push({root, 1}); // @viz init
        while (!st.empty()) { // @viz loop
            auto [node, depth] = st.top(); // @viz pop
            st.pop(); // @viz pop
            best = std::max(best, depth); // @viz best
            if (node->right) st.push({node->right, depth + 1}); // @viz push
            if (node->left) st.push({node->left, depth + 1}); // @viz push
        }
        return best; // @viz return
    }
};

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
    int goodNodes(TreeNode* root) {
        int count = 0; // @viz init
        std::stack<std::pair<TreeNode*, int>> st; // (node, largest value above it) // @viz init
        st.push({root, root->val}); // @viz init
        while (!st.empty()) { // @viz loop
            auto [node, best] = st.top(); // @viz pop
            st.pop(); // @viz pop
            if (node->val >= best) { // @viz check
                count++; // @viz good
            }
            best = std::max(best, node->val); // @viz update
            // push right first so the left child is popped (visited) first
            if (node->right) st.push({node->right, best}); // @viz push
            if (node->left) st.push({node->left, best}); // @viz push
        }
        return count; // @viz return
    }
};

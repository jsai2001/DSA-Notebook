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
#include <cstdlib>
#include <stack>
#include <unordered_map>
#include <utility>
class Solution {
public:
    bool isBalanced(TreeNode* root) {
        std::unordered_map<TreeNode*, int> height{{nullptr, 0}}; // node -> height of its subtree, filled in children first // @viz init
        std::stack<std::pair<TreeNode*, bool>> st; // (node, are its children done?) // @viz init
        if (root) st.push({root, false}); // @viz init
        while (!st.empty()) { // @viz loop
            auto [node, childrenDone] = st.top(); // @viz loop
            st.pop(); // @viz loop
            if (!childrenDone) { // first visit: come back after both children // @viz push
                st.push({node, true}); // @viz push
                if (node->right) st.push({node->right, false}); // @viz push
                if (node->left) st.push({node->left, false}); // @viz push
                continue; // @viz push
            }
            int left = height[node->left], right = height[node->right]; // second visit: both heights are known // @viz visit
            if (std::abs(left - right) > 1) return false; // @viz bad
            height[node] = 1 + std::max(left, right); // @viz visit
        }
        return true; // @viz return
    }
};

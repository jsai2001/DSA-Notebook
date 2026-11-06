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
#include <unordered_map>
#include <utility>
class Solution {
public:
    int maxPathSum(TreeNode* root) {
        int best = root->val; // @viz init
        std::unordered_map<TreeNode*, int> gain{{nullptr, 0}}; // node -> best path starting at it and going down // @viz init
        std::stack<std::pair<TreeNode*, bool>> st; // (node, are its children done?) // @viz init
        st.push({root, false}); // @viz init
        while (!st.empty()) { // @viz loop
            auto [node, childrenDone] = st.top(); // @viz loop
            st.pop(); // @viz loop
            if (!childrenDone) { // first visit: come back after both children // @viz push
                st.push({node, true}); // @viz push
                if (node->right) st.push({node->right, false}); // @viz push
                if (node->left) st.push({node->left, false}); // @viz push
                continue; // @viz push
            }
            int left = std::max(0, gain[node->left]), right = std::max(0, gain[node->right]); // second visit // @viz visit
            best = std::max(best, node->val + left + right); // a path that bends here // @viz bend
            gain[node] = node->val + std::max(left, right); // what it offers its parent // @viz up
        }
        return best; // @viz return
    }
};

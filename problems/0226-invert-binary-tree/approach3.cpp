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
#include <utility>
class Solution {
public:
    TreeNode* invertTree(TreeNode* root) {
        if (!root) return nullptr; // @viz base
        std::swap(root->left, root->right); // swap the children, then invert each one // @viz swap
        invertTree(root->left); // @viz swap
        invertTree(root->right); // @viz swap
        return root; // @viz return
    }
};

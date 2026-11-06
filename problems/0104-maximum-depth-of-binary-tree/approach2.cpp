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
class Solution {
public:
    int maxDepth(TreeNode* root) {
        if (!root) return 0; // no node: depth 0 // @viz empty
        int left = maxDepth(root->left); // @viz left
        int right = maxDepth(root->right); // @viz right
        return 1 + std::max(left, right); // this node, plus the deeper side // @viz return
    }
};

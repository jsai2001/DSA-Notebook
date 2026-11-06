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
#include <cstdlib>
class Solution {
public:
    bool isBalanced(TreeNode* root) {
        if (!root) return true; // an empty tree is balanced // @viz empty
        if (std::abs(height(root->left) - height(root->right)) > 1) return false; // this node's two sides differ too much // @viz check, bad
        return isBalanced(root->left) && isBalanced(root->right); // every node must pass, not just the root // @viz recurse
    }
private:
    int height(TreeNode* node) { // the number of nodes on the longest path down // @viz height
        if (!node) return 0; // @viz height
        return 1 + std::max(height(node->left), height(node->right)); // @viz height
    }
};

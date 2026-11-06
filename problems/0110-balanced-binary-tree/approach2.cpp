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
        return check(root) != -1; // @viz return
    }
private:
    int check(TreeNode* node) { // the height of this subtree, or -1 if it isn't balanced // @viz call
        if (!node) return 0; // @viz empty
        int left = check(node->left); // @viz left
        if (left == -1) return -1; // a problem below: stop right away // @viz left
        int right = check(node->right); // @viz right
        if (right == -1) return -1; // @viz right
        if (std::abs(left - right) > 1) return -1; // @viz bad
        return 1 + std::max(left, right); // balanced: pass the height up // @viz height
    }
};

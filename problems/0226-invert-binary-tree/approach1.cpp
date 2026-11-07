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
class Solution {
public:
    TreeNode* invertTree(TreeNode* root) {
        return mirror(root); // the original tree isn't changed // @viz return
    }
private:
    TreeNode* mirror(TreeNode* node) { // a new tree: the mirror image of node's subtree // @viz call
        if (!node) return nullptr; // @viz base
        TreeNode* copy = new TreeNode(node->val); // @viz copy
        copy->left = mirror(node->right); // the left side of the copy is the mirrored right side // @viz copy
        copy->right = mirror(node->left); // @viz copy
        return copy; // @viz copy
    }
};

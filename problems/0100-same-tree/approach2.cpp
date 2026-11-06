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
    bool isSameTree(TreeNode* p, TreeNode* q) {
        if (!p && !q) return true; // both missing: the same (nothing) // @viz both
        if (!p || !q) return false; // only one is missing: different shapes // @viz one
        if (p->val != q->val) return false; // @viz val
        return isSameTree(p->left, q->left) && isSameTree(p->right, q->right); // @viz recurse
    }
};

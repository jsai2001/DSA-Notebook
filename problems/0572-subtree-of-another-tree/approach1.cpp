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
    bool isSubtree(TreeNode* root, TreeNode* subRoot) {
        if (!root) return false; // ran off the tree: nothing down here can match // @viz empty
        if (same(root, subRoot)) { // does the subtree that starts here match exactly? // @viz try
            return true; // @viz found
        }
        return isSubtree(root->left, subRoot) || isSubtree(root->right, subRoot); // @viz down
    }
private:
    bool same(TreeNode* a, TreeNode* b) { // @viz same
        if (!a || !b) return a == b; // both empty: same; only one empty: different // @viz same
        return a->val == b->val && same(a->left, b->left) && same(a->right, b->right); // @viz same
    }
};

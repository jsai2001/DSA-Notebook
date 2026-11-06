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
#include <unordered_map>
#include <vector>
class Solution {
public:
    TreeNode* buildTree(std::vector<int>& preorder, std::vector<int>& inorder) {
        where.clear(); // value -> its index in inorder: O(1) lookups // @viz init
        for (int i = 0; i < (int)inorder.size(); ++i) where[inorder[i]] = i; // @viz init
        pre = &preorder; // @viz init
        next = 0; // the next unused value of preorder // @viz init
        return build(0, (int)inorder.size() - 1); // @viz init
    }
private:
    std::unordered_map<int, int> where;
    std::vector<int>* pre = nullptr;
    int next = 0;
    TreeNode* build(int lo, int hi) { // build the subtree made of inorder[lo..hi] // @viz call
        if (lo > hi) return nullptr; // no values here: no subtree // @viz empty
        TreeNode* root = new TreeNode((*pre)[next++]); // preorder gives the roots in the order they're needed // @viz root
        int k = where[root->val]; // @viz find
        root->left = build(lo, k - 1); // left first: preorder lists the whole left subtree before the right // @viz left
        root->right = build(k + 1, hi); // @viz right
        return root; // @viz return
    }
};
